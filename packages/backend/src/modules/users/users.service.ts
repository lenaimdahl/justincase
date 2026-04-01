import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from 'src/modules/users/schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({email}).exec();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({username}).exec();
  }

  async findByGoogleId(googleId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({googleId}).exec();
  }

  async findByAppleId(appleId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({appleId}).exec();
  }

  async create(data: Partial<User>): Promise<UserDocument> {
    this.logger.debug(`Creating user with email "${data.email}"`);
    const user = new this.userModel(data);
    return user.save();
  }

  async incrementTokenVersion(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {$inc: {tokenVersion: 1}}).exec();
  }
}
