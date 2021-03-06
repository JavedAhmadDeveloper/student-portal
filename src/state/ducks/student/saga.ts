import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import apiCaller from "../../utils/apiCaller";
import { fetchStudentsSuccess } from "./reducer";
import { IStudentRaw, StudentActionTypes } from "./types";

function* handleFetch(action: any): Generator {
  try {
    const res: IStudentRaw[] | any = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route
    );

    yield put(fetchStudentsSuccess(res));
  } catch {}
}

function* watchFetchRequest(): Generator {
  yield takeEvery(StudentActionTypes.FETCH_STUDENTS, handleFetch);
}

export default function* studentSaga() {
  yield all([fork(watchFetchRequest)]);
}
