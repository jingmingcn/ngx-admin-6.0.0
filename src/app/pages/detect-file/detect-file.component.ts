import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbStepComponent, NbStepperComponent } from '@nebular/theme';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { ApiService, DetectFile } from 'app/api.service';
import { DownloadService } from 'app/download.service';
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { saveAs } from 'file-saver';

@Component({
  selector: 'ngx-detect-file',
  templateUrl: 'detect-file.component.html',
  styleUrls: ['detect-file.component.scss'],
})
export class DetectFileComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".docx",
    maxSize: "20",
    uploadAPI:  {
      url:"api/thesis/uploadFile",
      method:"POST",
      headers: {
        "Authorization" : `Bearer`,
      },
      params: {
        type: 'detect'
      },
      //responseType: 'blob',
    },
    theme: "dragNDrop",
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
      sizeLimit: '上传文件大小限制',
    }
  };

  resetVar = true;

  detectFile: DetectFile;


  @ViewChild('fileUpload1')
  private fileUpload1:  AngularFileUploaderComponent;

  @ViewChild('stepper')
  private stepper: NbStepperComponent;

  @ViewChild('step1')
  private step1: NbStepComponent;

  @ViewChild('step2')
  private step2: NbStepComponent;

  @ViewChild('step3')
  private step3: NbStepComponent;

  constructor(private fb: FormBuilder,
              private authService: NbAuthService,
              private apiService: ApiService,
              private downloadService: DownloadService) {
    authService.getToken().subscribe((token: NbAuthJWTToken)=>{
      this.afuConfig.uploadAPI.headers.Authorization = "Bearer "+token.getValue();
    });

    apiService.getDetectFile().subscribe((df: DetectFile)=>{
      this.detectFile = df;
      if(df && df.status != "-1"){
        this.step1.completed = true;
      }
      if(df && df.status === "1"){
        this.step1.completed = true;
        this.step2.completed = true;
        this.step3.completed = true;
        this.stepper.selected = this.step3;
      }
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

  download() {
    this.downloadService
      .download('api/thesis/downloadDetectFile')
      .subscribe(blob => saveAs(blob, 'detectfile.docx'))
  }
}


