import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaLink,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import { toast } from "react-toastify";

function ShareButtons({ blog }) {
  const url = window.location.href;

  const title = blog.title;

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `${title}\n${url}`
      )}`,
      "_blank"
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);

    toast.success("Link copied!");
  };

  const nativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title,
        url,
      });
    } catch {}
  };

  return (
    <div className="mx-auto mt-14 max-w-4xl">

      <h3 className="mb-5 text-xl font-bold">
        Share this article
      </h3>

      <div className="flex flex-wrap gap-3">

        <button
          onClick={shareFacebook}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:scale-105"
        >
          <FaFacebookF />
        </button>

        <button
          onClick={shareTwitter}
          className="rounded-xl bg-black px-5 py-3 text-white transition hover:scale-105"
        >
          <FaXTwitter />
        </button>

        <button
          onClick={shareLinkedIn}
          className="rounded-xl bg-blue-700 px-5 py-3 text-white transition hover:scale-105"
        >
          <FaLinkedinIn />
        </button>

        <button
          onClick={shareWhatsApp}
          className="rounded-xl bg-green-600 px-5 py-3 text-white transition hover:scale-105"
        >
          <FaWhatsapp />
        </button>

        <button
          onClick={copyLink}
          className="rounded-xl border px-5 py-3 transition hover:bg-slate-100"
        >
          <FaLink />
        </button>

        {"share" in navigator && (

          <button
            onClick={nativeShare}
            className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Share
          </button>

        )}

      </div>

    </div>
  );
}

export default ShareButtons;