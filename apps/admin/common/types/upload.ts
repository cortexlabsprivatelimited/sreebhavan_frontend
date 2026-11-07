/** File stored by POST /admin/uploads. URLs are full public URLs built by the API. */
export interface UploadedFile {
  url: string;
  thumbUrl: string | null;
}

export interface UploadedFileApiResponse {
  url: string;
  thumb_url: string | null;
}
