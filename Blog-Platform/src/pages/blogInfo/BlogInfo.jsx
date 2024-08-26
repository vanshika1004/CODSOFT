import React ,{useContext,useState,useEffect} from 'react'
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp,addDoc } from 'firebase/firestore';
import { fireDb } from '../../firebase/FirebaseConfig';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import Comment from '../../components/comment/Comment';
import toast from 'react-hot-toast';

function BlogInfo() {
  const context = useContext(myContext);
  const { mode, setloading, loading } = context;

  //* getBlogs State 
  const [getBlogs, setGetBlogs] = useState();
  const params = useParams()

  const getAllBlogs = async () => {
    setloading(true);
    try {
      const productTemp = await getDoc(doc(fireDb, "blogPost", params.id))
      if (productTemp.exists()) {
        setGetBlogs(productTemp.data());
      } else {
        console.log("Document does not exist")
      }
      setloading(false)
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }

  // console.log(getBlogs)

  useEffect(() => {
    getAllBlogs();
    window.scrollTo(0, 0)
  }, []);

  
  //* Create markup function 
  function createMarkup(c) {
    return { __html: c };
  }

  const [fullName, setFullName] = useState('');
  const [commentText, setCommentText] = useState('');

  const addComment = async () => {
    const commentRef = collection(fireDb, "blogPost/" + `${params.id}/` + "comment")
    try {
      await addDoc(
        commentRef, {
        fullName,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
      })
      toast.success('Comment Add Successfully');
      setFullName("")
      setCommentText("")
    } catch (error) {
      console.log(error)
    }
  }

  const [allComment, setAllComment] = useState([]);

const getcomment = async () => {
  try {
    const q = query(
      collection(fireDb, "blogPost/" + `${params.id}/` + "comment/"),
      orderBy('time')
    );
    const data = onSnapshot(q, (QuerySnapshot) => {
      let productsArray = [];
      QuerySnapshot.forEach((doc) => {
        productsArray.push({ ...doc.data(), id: doc.id });
      });
      setAllComment(productsArray)
      console.log(productsArray)
    });
    return () => data;
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  getcomment()
}, []);
  return (
    <div>
      <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4 ">
        <div className=" py-4 lg:py-8">
          {loading ?
            <Loader />
            :
            <div >
                {/* Thumbnail  */}
                <img alt="content" className="mb-3 rounded-lg h-full w-full"
                  src={getBlogs?.thumbnail}
                />
                {/* title And date  */}
                <div className="flex justify-between items-center mb-3">
                  <h1 style={{ color: mode === 'dark' ? 'white' : 'black' }}
                    className=' text-xl md:text-2xl lg:text-2xl font-semibold'>
                    {getBlogs?.blogs?.title}
                  </h1>
                  <p style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                    {getBlogs?.date}
                  </p>
                </div>
                <div
                  className={`border-b mb-5 ${mode === 'dark' ?
                        'border-gray-600' : 'border-gray-400'}`}
                />
                {/* blog Content  */}
                <div className="content">
                  <div
                    className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${mode === 'dark' ? '[&>h1]:text-[#ff4d4d]' : '[&>h1]:text-black'}
                        ${mode === 'dark' ? '[&>h2]:text-white' : '[&>h2]:text-black'}
                        ${mode === 'dark' ? '[&>h3]:text-white' : '[&>h3]:text-black'}
                        ${mode === 'dark' ? '[&>h4]:text-white' : '[&>h4]:text-black'}
                        ${mode === 'dark' ? '[&>h5]:text-white' : '[&>h5]:text-black'}
                        ${mode === 'dark' ? '[&>h6]:text-white' : '[&>h6]:text-black'}
                        ${mode === 'dark' ? '[&>p]:text-[#7efff5]' : '[&>p]:text-black'}
                        ${mode === 'dark' ? '[&>ul]:text-white' : '[&>ul]:text-black'}
                        ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}
                        ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}
                        `}
                    dangerouslySetInnerHTML={createMarkup(getBlogs?.blogs?.content)}>
                  </div>
              </div>
            </div>
          }
        </div>
          {/* comment */}
          <Comment
          addComment={addComment}
          commentText={commentText}
          setcommentText={setCommentText}
          allComment={allComment}
          fullName={fullName}
          setFullName={setFullName}
          />
      </section>
    </Layout>
    </div>
  )
}

export default BlogInfo