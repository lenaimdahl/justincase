import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {isValidObjectId, Model} from 'mongoose';
import {User, UserDocument} from 'src/modules/users/schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(data: Partial<User>): Promise<UserDocument> {
    this.logger.debug(`Creating user with email "${data.email}"`);
    const user = new this.userModel(data);
    return user.save();
  }

  async findByAppleId(appleId: string): Promise<null | UserDocument> {
    return this.userModel.findOne({appleId: {$eq: appleId}}).exec();
  }

  async findByEmail(email: string): Promise<null | UserDocument> {
    return this.userModel.findOne({email: {$eq: email}}).exec();
  }

  async findByGoogleId(googleId: string): Promise<null | UserDocument> {
    return this.userModel.findOne({googleId: {$eq: googleId}}).exec();
  }

  async findById(id: string): Promise<null | UserDocument> {
    if (!isValidObjectId(id)) {
      return null;
    }
    return this.userModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<null | UserDocument> {
    return this.userModel.findOne({username: {$eq: username}}).exec();
  }

  async incrementTokenVersion(userId: string): Promise<void> {
    if (!isValidObjectId(userId)) {
      return;
    }
    await this.userModel.findByIdAndUpdate(userId, {$inc: {tokenVersion: 1}}).exec();
  }
}
