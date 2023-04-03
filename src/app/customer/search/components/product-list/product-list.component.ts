import { Component, OnInit } from '@angular/core';
import { Observable, of, timeout } from 'rxjs';
export interface Product {
  name: string;
  address: string;
  benefits: string[];
  startRating: number;
  originalPrice: number;
  rentalPrice: number;
  averageRating: AverageRating;
  reviewImages: Image[];
  topBadges: TopBadge[];
  propertyCards: PropertyCard[]
}
interface AverageRating {
  name: string;
  points: number;
  reviews: number;
}
interface TopBadge {
  name: string;
  icon: string
}
interface PropertyCard {
  name: string;
  icon: string
}
interface Image {
  url: string;
  isThumbnail: boolean;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  constructor() {}

  ngOnInit(): void {
    this.products$ = of<Product[]>([
      {
        name: 'Adaline Hotel & Suite',
        address: 'Quan 1, TP Ho Chi Minh',
        benefits: ["benefit 1", "benefit 2", "benefit 3"],
        startRating: 2,
        originalPrice: 1300000,
        rentalPrice: 360000,
        averageRating: {
          name: 'xuất sắc',
          points: 8,
          reviews: 1348,
        },
        topBadges: [
          {
            name: "Spring tin tưởng",
            icon: 'preferred'
          },
          {
            name: "Cảnh biển",
            icon: 'sea-view'
          },
          {
            name: "Travel sustainable",
            icon: 'sustainable'
          },
        ],
        reviewImages: [],
        propertyCards: [
          {
            name: 'Online Payment',
            icon: 'online-payment'
          },
          {
            name: 'Giao dịch trong nước',
            icon: 'domestic-deal'
          },
        ]
      },
      {
        name: 'Adaline Hotel & Suite',
        address: 'Quan 1, TP Ho Chi Minh',
        benefits: ["benefit 1", "benefit 2", "benefit 3"],
        startRating: 2,
        originalPrice: 1300000,
        rentalPrice: 360000,
        averageRating: {
          name: 'xuất sắc',
          points: 8,
          reviews: 1348,
        },
        topBadges: [
          {
            name: "Spring tin tưởng",
            icon: 'preferred'
          },
          {
            name: "Cảnh biển",
            icon: 'sea-view'
          },
          {
            name: "Travel sustainable",
            icon: 'sustainable'
          },
        ],
        reviewImages: [],
        propertyCards: [
          {
            name: 'Online Payment',
            icon: 'online-payment'
          },
          {
            name: 'Giao dịch trong nước',
            icon: 'domestic-deal'
          },
        ]
      },
      {
        name: 'Adaline Hotel & Suite',
        address: 'Quan 1, TP Ho Chi Minh',
        benefits: ["benefit 1", "benefit 2", "benefit 3"],
        startRating: 2,
        originalPrice: 1300000,
        rentalPrice: 360000,
        averageRating: {
          name: 'xuất sắc',
          points: 8,
          reviews: 1348,
        },
        topBadges: [
          {
            name: "Spring tin tưởng",
            icon: 'preferred'
          },
          {
            name: "Cảnh biển",
            icon: 'sea-view'
          },
          {
            name: "Travel sustainable",
            icon: 'sustainable'
          },
        ],
        reviewImages: [],
        propertyCards: [
          {
            name: 'Online Payment',
            icon: 'online-payment'
          },
          {
            name: 'Giao dịch trong nước',
            icon: 'domestic-deal'
          },
        ]
      },
    
    ]).pipe(
      timeout(5000)
    )
    ;
  }
}
