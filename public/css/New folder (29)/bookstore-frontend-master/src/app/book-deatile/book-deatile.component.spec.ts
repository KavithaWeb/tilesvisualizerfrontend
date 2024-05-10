import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDeatileComponent } from './book-deatile.component';

describe('BookDeatileComponent', () => {
  let component: BookDeatileComponent;
  let fixture: ComponentFixture<BookDeatileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookDeatileComponent]
    });
    fixture = TestBed.createComponent(BookDeatileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
