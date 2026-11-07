import { useCrudListState } from '~/common/controllers/useCrudListState';
import { useHallPackagesRepository, validateHallPackageForm } from '../domain/eventHall.repository';
import { createEmptyHallPackageForm, toHallPackageForm } from '../model/eventHall.model';

export const useHallPackagesController = () =>
  useCrudListState({
    key: 'admin-hall-packages',
    repository: useHallPackagesRepository(),
    createEmptyForm: createEmptyHallPackageForm,
    toForm: toHallPackageForm,
    validateForm: validateHallPackageForm,
  });
