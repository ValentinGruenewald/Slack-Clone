import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, Auth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import {
  provideFirestore,
  getFirestore,
  FirestoreModule,
} from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ChatComponent } from './chat/chat.component';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './services/auth.service';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatMenuModule } from '@angular/material/menu';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogUserInfoComponent } from './dialog-user-info/dialog-user-info.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { DialogEditChannelComponent } from './dialog-edit-channel/dialog-edit-channel.component';
import { DialogThreadMessagesComponent } from './dialog-thread-messages/dialog-thread-messages.component';
import { DialogConfirmDeleteChatComponent } from './dialog-confirm-delete-chat/dialog-confirm-delete-chat.component';
import { DialogAddChatComponent } from './dialog-add-chat/dialog-add-chat.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    ChatComponent,
    SignupComponent,
    DialogAddChannelComponent,
    DialogUserInfoComponent,
    DialogEditUserComponent,
    DialogEditChannelComponent,
    DialogThreadMessagesComponent,
    DialogConfirmDeleteChatComponent,
    DialogAddChatComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    FirestoreModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    MatMenuModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
