import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostService } from '../post.sevices';


describe('PostService', () => {
  let service: PostService;
  let httpServiceMock: jasmine.SpyObj<HttpClient>;
  let mockHttp: HttpTestingController;
  let path = environment.services.authentication.path;

  let commet = {
    id: 0,
    respondsTo: null,
    author: 1,
    timestamp: '2019-02-20T13:00Z',
    content: 'Teste 1',
  }

  let comments = {
    id: 1,
    comments: commet,
  }

  beforeEach(() => {
    httpServiceMock = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        PostService,
        { 
          provide: HttpClient, 
          useValue: httpServiceMock 
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(PostService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test for searching by id in posts, checking the GET method', () => {
    const id = 1
    const spyShowMessage = httpServiceMock.get.and.returnValue(of(`${path}posts/${id}`))
    service.getPost(id).subscribe({
      next: (response: any) => {
        expect(response).toEqual(`${path}posts/${id}`);
        expect(spyShowMessage).toHaveBeenCalled();
      },
      error: (error: Error) => {
        console.error(error)
      }
    })
  });

  it('Test on listing all posts by, checking GET method', () => {
    const spyShowMessage = httpServiceMock.get.and.returnValue(of(`${path}posts`))
    service.getAllPost().subscribe({
      next: (response: any) => {
        expect(response).toEqual(`${path}posts`);
        expect(spyShowMessage).toHaveBeenCalled();
      },
      error: (error: Error) => {
        console.error(error)
      }
    })
  });

  it('Test for searching by id in author, checking the GET method', () => {
    const id = 1
    const spyShowMessage = httpServiceMock.get.and.returnValue(of(`${path}author/${id}`))
    service.getAuthor(id).subscribe({
      next: (response: any) => {
        expect(response).toEqual(`${path}author/${id}`);
        expect(spyShowMessage).toHaveBeenCalled();
      },
      error: (error: Error) => {
        console.error(error)
      }
    })
  });

  it('Test on listing all authors by, checking GET method', () => {
    const spyShowMessage = httpServiceMock.get.and.returnValue(of(`${path}author`))
    service.getAllAuthor().subscribe({
      next: (response: any) => {
        expect(response).toEqual(`${path}author`);
        expect(spyShowMessage).toHaveBeenCalled();
      },
      error: (error: Error) => {
        console.error(error)
      }
    })
  });

  it('Test for searching by id in comment, checking the GET method', () => {
    const id = 1
    const spyShowMessage = httpServiceMock.get.and.returnValue(of(`${path}comment/${id}`))
    service.getComment(id).subscribe({
      next: (response: any) => {
        expect(response).toEqual(`${path}comment/${id}`);
        expect(spyShowMessage).toHaveBeenCalled();
      },
      error: (error: Error) => {
        console.error(error)
      }
    })
  });

  it('Test save comment by, checking PUT method', () => {
    const id = 1
    const spyShowMessage = httpServiceMock.put.and.returnValue(of(`${path}comment/${id}`))
    service.createComment(comments, id).subscribe({
      next: (response: any) => {
        expect(response).toEqual(`${path}comment/${id}`);
        expect(spyShowMessage).toHaveBeenCalled();
      },
      error: (error: Error) => {
        console.error(error)
      }
    })
  });
});
