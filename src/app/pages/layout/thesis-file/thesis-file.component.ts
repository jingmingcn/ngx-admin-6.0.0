import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'ngx-thesis-file',
  templateUrl: 'thesis-file.component.html',
  styleUrls: ['thesis-file.component.scss'],
})
export class ThesisFileComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".pdf",
    maxSize: "20",
    uploadAPI:  {
      url:"api/thesis/uploadFile",
      method:"POST",
      headers: {
        "Authorization" : `Bearer`,
      },
      params: {
        "type":"thesis",
      },
      //responseType: 'blob',
    },
    //theme: "dragNDrop",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: false,
    replaceTexts: {
      selectFileBtn: '选择文件',
      resetBtn: '重置',
      uploadBtn: '上传',
      dragNDropBox: '拖拽文件到这里 或 选择文件上传',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: '上传成功!',
      afterUploadMsg_error: '上传失败!',
      sizeLimit: '上传文件大小限制'
    }
  };

  resetVar = true;


  @ViewChild('fileUpload1')
  private fileUpload1:  AngularFileUploaderComponent;

  constructor(private fb: FormBuilder, private authService: NbAuthService) {
    authService.getToken().subscribe((token: NbAuthJWTToken)=>{
      this.afuConfig.uploadAPI.headers.Authorization = "Bearer "+token.getValue();
    });
  }

  

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
}
