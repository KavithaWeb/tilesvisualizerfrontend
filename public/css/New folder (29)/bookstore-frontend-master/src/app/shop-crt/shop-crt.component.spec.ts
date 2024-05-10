import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCrtComponent } from './shop-crt.component';

describe('ShopCrtComponent', () => {
  let component: ShopCrtComponent;
  let fixture: ComponentFixture<ShopCrtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopCrtComponent]
    });
    fixture = TestBed.createComponent(ShopCrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
