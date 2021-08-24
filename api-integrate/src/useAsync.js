import { useReducer, useEffect } from "react";

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case "SUCCESS":
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`)

    }
}

//useAsync 함수는 두가지 파라미터를 가져옴.
// 첫번째 파라미터는 API요청을 시작하는 함수, 
//두번쨰 파라미터는 deps인데 이 deps 값은 해당 함수 안에서
//사용하는 useEffect의 deps로 설정.
//이 값의 기본값은 [] 입니다. 즉, 컴포넌트가 가장 처음 렌더링 할 때만 API 를 호출하고 싶다는 의미죠.
function useAsync(callback, deps = [], skip = false) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: false
    });
    const fetchData = async() => {
        dispatch({ type: "LOADING" });
        try {
            const data = await callback();
            dispatch({ type: "SUCCESS", data });

        } catch (e) {
            dispatch({ type: "ERROR", error: e });
        }
    };

    useEffect(() => {
        if (skip) return;
        fetchData();
        //eslint-disable-nextline
    }, deps);

    return [state, fetchData];
}

export default useAsync;