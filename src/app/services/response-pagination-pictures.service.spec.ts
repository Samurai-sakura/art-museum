import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PaginationService } from "./response-pagination-pictures.service";

describe("PaginationService", () => {
  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PaginationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
