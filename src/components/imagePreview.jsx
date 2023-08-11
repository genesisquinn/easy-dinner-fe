import PropTypes from 'prop-types';

const ImagePreview = (props) => {
    const { image } = props;
    return (
        <div>
            <img src={image && URL.createObjectURL(image)} />
        </div>
    )
}

ImagePreview.propTypes = {
    image: PropTypes.instanceOf(File),
};

export default ImagePreview;