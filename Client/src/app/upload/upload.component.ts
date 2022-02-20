import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpEventType} from "@angular/common/http";
import {UploadService} from "../services/upload.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public progress!: number;
  public message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
  }

  public uploadFile = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.uploadService.upload(formData).subscribe({
      next: ((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success';
          this.onUploadFinished.emit(event.body);
        }
      }),
      error: (error) => {
        console.log(error);
      }
    });
  }

}
