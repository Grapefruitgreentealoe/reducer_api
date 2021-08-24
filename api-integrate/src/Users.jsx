import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser() {
  const response = await axios.get(
    'https://inspct.career.go.kr/openapi/test/questions?apikey=4848423aeee0be0d33a5f674f4383583&q=6',
  );

  return response.data.RESULT;
}

function Users() {
  const [state, refetch] = useAsync(getUser, [], true);

  const { loading, data: users, error } = state;
  // state.data.RESULT 를 users 키워드로 조회
  if (loading) return <div>로딩중..</div>; //로딩
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;

  return (
    <>
      {users.map((user, index) => (
        <ul key={index}>
          {index >= 0 && index <= 4 ? (
            <li>
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
      ))}
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users;
