import avatarImg from '../../../assets/images/placeholder.jpg'

const Avatar = () => {
    return (
        <div>
            <img className='rounded-full' src={avatarImg} alt="profile" height="30" width="30" />
        </div>
    );
};

export default Avatar;