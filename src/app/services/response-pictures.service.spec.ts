import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ResponseService } from "./response-pictures.service";

describe("ResponseService", () => {
  let service: ResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ResponseService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
