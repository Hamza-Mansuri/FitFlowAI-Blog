import {
  FaUser,
  FaClock,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";

function BlogHero({ blog }) {
  return (
    <>
      {/* Hero Image */}

      <div className="overflow-hidden rounded-3xl shadow-xl">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-[320px] w-full bg-slate-100 object-contain md:h-[480px]"
        />
      </div>

      {/* Category */}

      <span className="mt-8 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
        {blog.category}
      </span>

      {/* Title */}

      <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
        {blog.title}
      </h1>

      {/* Description */}

      <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-600">
        {blog.description}
      </p>

      {/* Meta */}

      <div className="mt-8 flex flex-wrap gap-6 border-y border-slate-200 py-5 text-sm text-slate-500">

        <div className="flex items-center gap-2">
          <FaUser className="text-green-600" />
          {blog.author}
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-green-600" />
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2">
          <FaClock className="text-green-600" />
          {blog.readTime}

          <div className="flex items-center gap-2">

            <FaEye className="text-green-600" />

            {blog.views} Views

            </div>
        </div>

      </div>
    </>
  );
}

export default BlogHero;