import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotelProfileService} from "../../../services/lease/hotel-profile.service";
import {HotelProfile} from "../../../models/model";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  rfPhotos!: FormGroup;

  constructor(private formBuilder: FormBuilder, private hotelProfileService: HotelProfileService) {
  }

  hp!: HotelProfile;

  submitForm() {

    this.hp =
      {
        id: 0,
        basic: this.hotelProfileService.basic
        ,
        location: this.hotelProfileService.location,
        description: this.hotelProfileService.description,
        amenities: this.hotelProfileService.amenities,
        pricing: this.hotelProfileService.pricing,
        photos: this.rfPhotos.value,
        profile: {
          typeHost: "",
          company: {
            addressCompany: "",
            nameCompany: "",
            codeAreaCompany: ""
          },
          mySelf: {
            date: "",
            firstName: "",
            lastName: ""
          }
        },
      }
    this.hotelProfileService.updateHotelProfile(this.hotelProfileService.id_lock, this.hp).subscribe(value => {

      this.hotelProfileService.photos = value.photos;
   
    })

  }

  show: boolean = false;

  ngOnInit(): void {

    this.rfPhotos = this.formBuilder.group({


      file: ['', Validators.required],
      fileSource: ['', Validators.required],


    });
  }

  urls: string[] = [];

  onSelect(event: any) {
    this.show = true;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {

          this.urls.push(event.target.result);

          this.rfPhotos.patchValue({
            fileSource: this.urls
          });
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
