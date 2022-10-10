import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  inject,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { Authority } from "app/config/authority.constants";
import { UserManagementService } from "../service/user-management.service";
import { User } from "../user-management.model";

import { UserManagementUpdateComponent } from "./user-management-update.component";

describe("Component Tests", () => {
  describe("User Management Update Component", () => {
    let comp: UserManagementUpdateComponent;
    let fixture: ComponentFixture<UserManagementUpdateComponent>;
    let service: UserManagementService;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          declarations: [UserManagementUpdateComponent],
          providers: [
            FormBuilder,
            {
              provide: ActivatedRoute,
              useValue: {
                data: of({
                  user: new User(
                    "ABC",
                    "user",
                    "first",
                    "last",
                    "first@last.com",
                    true,
                    "en",
                    [Authority.USER],
                    "admin"
                  ),
                }),
              },
            },
          ],
        })
          .overrideTemplate(UserManagementUpdateComponent, "")
          .compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(UserManagementUpdateComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(UserManagementService);
    });

    describe("OnInit", () => {
      it("Should load authorities and language on init", inject(
        [],
        fakeAsync(() => {
          // GIVEN
          jest.spyOn(service, "authorities").mockReturnValue(of(["USER"]));

          // WHEN
          comp.ngOnInit();

          // THEN
          expect(service.authorities).toHaveBeenCalled();
          expect(comp.authorities).toEqual(["USER"]);
        })
      ));
    });

    describe("save", () => {
      it("Should call update service on save for existing user", inject(
        [],
        fakeAsync(() => {
          // GIVEN
          const entity = new User("ABC");
          jest.spyOn(service, "update").mockReturnValue(of(entity));
          comp.user = entity;
          comp.editForm.patchValue({ id: entity.id });
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.update).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      ));

      it("Should call create service on save for new user", inject(
        [],
        fakeAsync(() => {
          // GIVEN
          const entity = new User();
          jest.spyOn(service, "create").mockReturnValue(of(entity));
          comp.user = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.create).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      ));
    });
  });
});
