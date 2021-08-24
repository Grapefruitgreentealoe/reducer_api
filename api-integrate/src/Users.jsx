import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import { useAsync} from 'react-async';

async function getUser() {
  const response = await axios.get(
    'https://inspct.career.go.kr/openapi/test/questions?apikey=4848423aeee0be0d33a5f674f4383583&q=6',
  );

  return response.data.RESULT;
}



function Users() {
  const [page, setPage] = useState(0);

  const { loading, data: users, error ,run} = useAsync({
    deferFn: getUser,
  });

  useEffect(() => {
    run();
},[page])
  
  // state.data.RESULT 를 users 키워드로 조회
  if (loading) return <div>로딩중..</div>; //로딩
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return <button onClick={()=>setPage(page+1)}>불러오기</button>;

  return (
    <>
      {users.map((user, index) => (
        <ul key={index}>
          {index >= page * 5 && index <= page*5 + 4 ? (
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
      {page != users.length / 4 - 2? <button onClick={() => setPage(page + 1)}>다음</button>:null}
      {page > 0 ? <button onClick={() => setPage(page - 1)}>이전</button> : null}
      {page == 0 ? <button onClick={run}>다시 불러오기</button> : null}
    </>
  );
}

export default Users;
