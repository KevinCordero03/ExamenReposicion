import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PhotoService } from '../service/photo.service';

import { PhotoComponent } from './photo.component';

describe('Photo Management Component', () => {
  let comp: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'photo', component: PhotoComponent }]), HttpClientTestingModule],
      declarations: [PhotoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(PhotoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PhotoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.photos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to photoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getPhotoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getPhotoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});