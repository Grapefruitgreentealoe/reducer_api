import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });
  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' });
    try {
      //요청이 시작 될 때는 error users 초기화 하기
      const response = await axios.get(
        'https://inspct.career.go.kr/openapi/test/questions?apikey=4848423aeee0be0d33a5f674f4383583&q=6',
      );
      dispatch({ type: 'SUCCESS', data: response.data.RESULT });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //참고로, useEffect 에 첫번째 파라미터로 등록하는 함수에는 async 를 사용 할 수 없기 때문에 함수 내부에서 async 를 사용하는 새로운 함수를 선언해주어야 합니다.

  const { loading, data: users, error } = state;

  if (loading) return <div>로딩중..</div>; //로딩
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return null;

  return users.map((user, index) => (
    <ul>
      {index >= 0 && index <= 4 ? (
        <li key={user.qitemNo}>
          {user.question}
          <p>
            {[user.answer01, user.answer02].map((answer) => (
              <>
                <input key={answer} type="radio" value={answer} />
                <label>{answer}</label>
              </>
            ))}
          </p>
        </li>
      ) : null}
    </ul>
  ));
}

export default Users;
