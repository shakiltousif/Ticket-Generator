import box_image from '../assets/images/box_image.png';
import user_image from '../assets/images/user_image.jpg';
import { useRef, useState } from "react"
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';


export default function TicketGenerator() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [occ, setOcc] = useState('');

    const [shareUrl, setShareURL] = useState('https://codecarebd.com/ticket/');

    const image_div = useRef(null);


    const handleSubmit = (e) => {
        e.preventDefault();

        const Id = Math.floor(10000000 + Math.random() * 90000000);

        if (image_div?.current) {
            html2canvas(image_div?.current).then(canvas => {
                canvas.toBlob(blob => {
                    saveAs(blob, `codecarebd-ticket-${Id}.png`);
                });
            })
        }

        const url = `https://codecarebd.com/ticket/${Id}`;

        setShareURL(url);
    }
    return (
        <div>
            <div className="invitation-card">
                <div>
                    <h1>Ticket Generator</h1>
                    <p>CodeCareBD Programme</p>
                </div>

                {/* <!-- Share Card  --> */}
                <div className="share-card">

                    <h4>
                        Share:
                    </h4>

                    <div className="share-buttons">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}>
                            <i className="fa-brands fa-facebook"></i>
                            <span>Facebook</span>
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=Grab%20Your%20Ticket`}>
                            <i className="fa-brands fa-twitter"></i>
                            <span>Twitter</span>
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle/?url=${shareUrl}&title=CodeCareBD%20Ticket&summary=Grab%20Your%20Ticket`}>
                            <i className="fa-brands fa-linkedin"></i>
                            <span>Linkedin</span>
                        </a>
                        <a href={`whatsapp://send?text=${shareUrl}`}>
                            <i className="fa-brands fa-whatsapp"></i>
                            <span>Whatsapp</span>
                        </a>
                    </div>
                </div>


                <h4>Preview:</h4>

                {/* <!-- Wrapper  --> */}
                <div className="wrapper">

                    <div>
                        <img src={box_image} alt="Banner" />
                    </div>
                    <div className="user-avatar">
                        <img src={image?.name ? URL.createObjectURL(image) : user_image} alt="User" />
                    </div>
                    <div className="user-info">
                        <p className="user-name">{name}</p>
                        <p className="user-occupation">{occ}</p>
                    </div>
                </div>

                {/* <!-- Collecting Form  --> */}
                <div className="collecting-form">
                    <h4>Your Details</h4>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="user_image">User Avatar</label><br />
                            <input type="file" name="user_image" accept=".jpg,.png,.gif,.jpeg" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div>
                            <label htmlFor="u_name">Name</label><br />
                            <input type="text" name="u_name" placeholder="Name" maxLength="20" onChange={(e) => setName(e.target.value)} />

                        </div>
                        <div>
                            <label htmlFor="u_occupation">Occupation</label><br />
                            <input type="text" name="u_occupation" placeholder="Occupation" maxLength="15" onChange={(e) => setOcc(e.target.value)} />
                        </div>
                        <div>
                            <input type="submit" value="Get Ticket" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}