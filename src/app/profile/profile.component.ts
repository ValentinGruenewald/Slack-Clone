import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ImageUploadService } from '../services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user$ = this.authService.currentUser$;

  constructor(
    private authService: AuthService,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService
  ) {}

  uploadImage(event, user) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Image is being uploaded...',
          success: 'Image is successfully uploaded',
          error: 'There was an error in uploading'
        }),
        concatMap((photoURL)=> this.authService.updateProfile({photoURL}))
      ).subscribe();
  }
}
