import Posts from '../Posts/Posts'
import { getPostByText } from '../../features/posts/postsSlice'
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import './Home.scss'

const Home = () => {

  const dispatch = useDispatch()

  const { Search } = Input;

  const onSearch = async (value) => {
    await dispatch(getPostByText(value))
  };

  return (
    <>
      <div className='searchContainer'>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          className='search'
        />
      </div>
      <Posts />
    </>
  )
}

export default Home