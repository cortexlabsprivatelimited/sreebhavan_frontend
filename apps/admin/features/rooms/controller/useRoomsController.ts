import { StorageFolders } from '~/common/constants/imageConstants';
import { useAutoSlug } from '~/common/controllers/useAutoSlug';
import { useCrudListState, type CrudRepository } from '~/common/controllers/useCrudListState';
import { useImageUploadState } from '~/common/controllers/useImageUploadState';
import { useToastStore } from '~/common/stores/toast';
import { useRoomsRepository, validateRoomForm } from '../domain/rooms.repository';
import {
  createEmptyRoomForm,
  toRoomForm,
  type Room,
  type RoomForm,
  type RoomFormPhoto,
} from '../model/rooms.model';

export const useRoomsController = () => {
  const roomsRepository = useRoomsRepository();
  const toast = useToastStore();

  /** After the room itself is saved, apply the photo changes made in the same form. */
  const savePhotosOf = async (room: Room, form: RoomForm): Promise<Room> => {
    const failedCount = await roomsRepository.syncRoomPhotos(room.id, form);
    if (failedCount > 0) {
      toast.showError(
        `Room saved, but ${failedCount} photo change(s) failed. Edit the room to try again.`,
      );
    }
    return room;
  };

  const repositoryWithPhotos: CrudRepository<Room, RoomForm> = {
    ...roomsRepository,
    create: async (form) => savePhotosOf(await roomsRepository.create(form), form),
    update: async (id, form) => savePhotosOf(await roomsRepository.update(id, form), form),
  };

  const crud = useCrudListState({
    key: 'admin-rooms',
    repository: repositoryWithPhotos,
    createEmptyForm: createEmptyRoomForm,
    toForm: toRoomForm,
    validateForm: validateRoomForm,
  });
  useAutoSlug(crud.form, crud.isEditing);

  // Photos inside the add/edit form: uploaded right away, attached to the room on save.
  const { isUploading: isUploadingPhotos, uploadImage } = useImageUploadState(StorageFolders.rooms);

  const addFormPhotos = async (files: File[]) => {
    for (const file of files) {
      const uploadedFile = await uploadImage(file);
      if (!uploadedFile) continue;
      crud.form.value.photos.push({
        key: `new-${Date.now()}-${file.name}`,
        id: null,
        url: uploadedFile.url,
        alt: '',
      });
    }
  };

  const removeFormPhoto = (photo: RoomFormPhoto) => {
    const form = crud.form.value;
    form.photos = form.photos.filter((formPhoto) => formPhoto.key !== photo.key);
    if (photo.id) form.removedPhotoIds.push(photo.id);
  };

  return { ...crud, isUploadingPhotos, addFormPhotos, removeFormPhoto };
};
