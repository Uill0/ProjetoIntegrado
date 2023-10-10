import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoomsComponent } from './list-rooms.component';

describe('ListRoomsComponent', () => {
  let component: ListRoomsComponent;
  let fixture: ComponentFixture<ListRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRoomsComponent]
    });
    fixture = TestBed.createComponent(ListRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
