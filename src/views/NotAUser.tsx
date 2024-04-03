import { Link } from 'react-router-dom'

export const NotAUser = () => {
    return (
        <>
            <div className="flex flex-col p-10 items-center">
                <span>사용자 정보가 없습니다.</span>
                <Link to="/login">
                    <button className="btn btn-primary  w-40 text-base-100 m-6">로그인</button>
                </Link>
            </div>
        </>
    )
}
