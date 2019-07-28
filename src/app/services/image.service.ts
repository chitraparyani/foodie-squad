import {Image} from '../models/Image';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable ({providedIn: 'root'})
export class ImageService {
  private images: Image[] = [];
  private imageUpdated = new Subject<{ images: Image[], imageCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getImage(userId: string) {
    // return {...this.posts.find(p => p.id === postId)};
    return this.http.get<Image[]>
    ('http://localhost:3000/api/images/' + userId);
  }

  getImageUpdatedListener() {
    return this.imageUpdated.asObservable();
  }

  addImages(userId: string, image: File) {
    const imageData = new FormData();
    imageData.append('userId', userId);
    imageData.append('image', image, "profilePic");
    this.http
    .post<{message: string, image: Image}>(
      'http://localhost:3000/api/images',
      imageData
      )
      .subscribe(responseData => {
        this.router.navigate(['/userView']);
      });
  }

  updateImage(id: string, userId: string, image: File | string) {
    let imageData: Image | FormData;
    if (typeof(image) === 'object') {
      imageData = new FormData();
      imageData.append('id', id);
      imageData.append('userId', userId);
      imageData.append('image', image, "profilePic");
    } else {
      imageData = {
        _id: id,
        userId,
        imagePath: image
      };
    }

    this.http.put('http://localhost:3000/api/images/' + id, imageData)
      .subscribe(response => {
        this.router.navigate(['/userView']);
        });
  }


  deleteImage(imageId: string) {
    return this.http.delete('http://localhost:3000/api/images/' + imageId);
  }
}
