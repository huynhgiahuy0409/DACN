import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  _homes: home[] = [];

  constructor() {
  }

  getAll() {
    this._homes = [
      {
        id: 1,
        title: 'Tôi làm chủ nhà cho chính tôi',
        desc: 'Chủ nhà tư nhân – bất kỳ bên nào đang cho thuê một chỗ nghỉ hoặc các chỗ nghỉ cho các mục đích ngoài thương mại, kinh doanh, hoặc nghề nghiệp của mình',
        isSelected: false
      },
      {
        id: 2,
        title: 'Tôi đại diện cho một công ty',
        desc: 'Chủ nhà chuyên nghiệp – bất kỳ bên nào đang cho thuê một chỗ nghỉ hoặc các chỗ nghỉ cho các mục đích liên quan đến thương mại, kinh doanh, hoặc nghề nghiệp của mình',
        isSelected: false
      }
    ]
  }
  value :number =1;
  changeValue(event :any){
    this.value=event.target.value;
  }
  ngOnInit(): void {
    this.getAll();
  }

}

class home {
  id: number | undefined;
  title: string = '';
  desc: string = '';
  isSelected: boolean = false;
}
