import {createAction, props} from "@ngrx/store";
import {User} from "../../admin/model/auth";

export enum UserNames {

  InitialState = '[User] InitialState',
  LoadUsers = '[User] loadUsers',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUsersFailure = '[User] Load Users Failure',

}

export namespace UserActions{

  export const initial=createAction(UserNames.InitialState);

  export const loadUsers = createAction(UserNames.LoadUsers);

  export const loadUsersSuccess = createAction(UserNames.LoadUsersSuccess, props<{ users: User }>());

  export const loadUsersFailure = createAction(UserNames.LoadUsersFailure, props<{ error: any }>());
}
