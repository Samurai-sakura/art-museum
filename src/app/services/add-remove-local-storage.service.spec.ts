import { TestBed } from "@angular/core/testing";

import { LocalStorageService } from "./add-remove-local-storage.service";

describe("LocalStorageService", () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
