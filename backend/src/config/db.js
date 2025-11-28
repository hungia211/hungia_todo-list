import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log('Kết nối CSDL MongoDB thành công');
    } catch (error) {
        console.error('Kết nối CSDL MongoDB thất bại:', error.message);
        process.exit(1);  // Thoát với trạng thái thất bại
    }
};

export default connectDB;