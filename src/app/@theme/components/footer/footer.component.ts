import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      &copy; 2021 <a href="https://iot.qlu.edu.cn" target="_blank">齐鲁工业大学物联网工程系</a>
    </span>
  `,
})
export class FooterComponent {
}
