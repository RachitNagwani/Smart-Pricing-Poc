import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSelectComponent } from './market-select.component';

describe('MarketSelectComponent', () => {
  let component: MarketSelectComponent;
  let fixture: ComponentFixture<MarketSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
