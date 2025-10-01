import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly baseUrl = 'http://localhost:3000/upload';

  constructor(private http: HttpClient) {}

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file); // backend should use upload.single('image') for generic uploads
    return this.http.post<{ url: string }>(this.baseUrl, formData);
  }
}


