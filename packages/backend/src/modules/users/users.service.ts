import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {isValidObjectId, Model} from 'mongoose';
import {User, UserDocument} from 'src/modules/users/schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<UserDocument | null> {
    if (!isValidObjectId(id)) {
      return null;
    }
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({email: {$eq: email}}).exec();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({username: {$eq: username}}).exec();
  }

  async findByGoogleId(googleId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({googleId: {$eq: googleId}}).exec();
  }

  async findByAppleId(appleId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({appleId: {$eq: appleId}}).exec();
  }

  async create(data: Partial<User>): Promise<UserDocument> {
    this.logger.debug(`Creating user with email "${data.email}"`);
    const user = new this.userModel(data);
    return user.save();
  }

  async incrementTokenVersion(userId: string): Promise<void> {
    if (!isValidObjectId(userId)) {
      return;
    }
    await this.userModel.findByIdAndUpdate(userId, {$inc: {tokenVersion: 1}}).exec();
  }
}
