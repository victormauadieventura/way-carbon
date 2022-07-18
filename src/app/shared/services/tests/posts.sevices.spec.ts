import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostsService } from '../posts.sevices';

describe('PostsService', () => {
  let service: PostsService;
  let httpServiceMock: jasmine.SpyObj<HttpClient>;
  let mockHttp: HttpTestingController;
  let path = environment.services.authentication.path;

  beforeEach(() => {
    httpServiceMock = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        PostsService,
        { 
          provide: HttpClient, 
          useValue: httpServiceMock 
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(PostsService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test on listing all posts by, checking GET method', () => {
    const spyShowMessage = httpServiceMock.get.and.returnValue(of(`${path}posts`))
    service.getAllPosts().subscribe({
      next: (response: any) => {
        expect(response).toEqual(`${path}posts`);
        expect(spyShowMessage).toHaveBeenCalled();
      },
      error: (error: Error) => {
        console.error(error)
      }
    })
  });
});
