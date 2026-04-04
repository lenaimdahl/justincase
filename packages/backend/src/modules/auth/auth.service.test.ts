import {ConflictException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from 'src/modules/auth/auth.service';
import {UsersService} from 'src/modules/users/users.service';
import {beforeEach, describe, expect, it, vi} from 'vitest';

vi.mock('bcrypt', () => ({
  compare: vi.fn(),
  hash: vi.fn().mockResolvedValue('$2b$12$hashed'),
}));

import * as bcrypt from 'bcrypt';

const mockUser = {
  _id: 'user-id',
  appleId: undefined,
  email: 'test@example.com',
  googleId: undefined,
  passwordHash: '$2b$12$hash',
  save: vi.fn(),
  tokenVersion: 0,
  username: 'testuser',
};

const mockUsersService = {
  create: vi.fn(),
  findByAppleId: vi.fn(),
  findByEmail: vi.fn(),
  findByGoogleId: vi.fn(),
  findById: vi.fn(),
  incrementTokenVersion: vi.fn(),
};

const mockJwtService = {
  sign: vi.fn().mockReturnValue('mock-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {provide: UsersService, useValue: mockUsersService},
        {provide: JwtService, useValue: mockJwtService},
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('returns user when credentials are valid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      const result = await service.validateUser('test@example.com', 'password123');

      expect(result).toEqual(mockUser);
    });

    it('returns null when user not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('unknown@example.com', 'password');

      expect(result).toBeNull();
    });

    it('returns null when password is wrong', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      const result = await service.validateUser('test@example.com', 'wrongpassword');

      expect(result).toBeNull();
    });

    it('returns null when user has no passwordHash', async () => {
      mockUsersService.findByEmail.mockResolvedValue({...mockUser, passwordHash: undefined});

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('returns accessToken', async () => {
      const result = await service.login(mockUser as never);

      expect(result).toEqual({accessToken: 'mock-token'});
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: 'test@example.com',
        sub: 'user-id',
        tokenVersion: 0,
      });
    });
  });

  describe('register', () => {
    it('creates a new user and returns accessToken', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(mockUser);

      const result = await service.register({email: 'new@example.com', password: 'password123'});

      expect(result).toEqual({accessToken: 'mock-token'});
      expect(mockUsersService.create).toHaveBeenCalledWith(expect.objectContaining({email: 'new@example.com'}));
    });

    it('throws ConflictException when email already in use', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);

      await expect(service.register({email: 'test@example.com', password: 'password123'})).rejects.toThrow(
        ConflictException
      );
    });
  });

  describe('logout', () => {
    it('increments token version', async () => {
      mockUsersService.incrementTokenVersion.mockResolvedValue(undefined);

      await service.logout('user-id');

      expect(mockUsersService.incrementTokenVersion).toHaveBeenCalledWith('user-id');
    });
  });

  describe('findOrCreateGoogleUser', () => {
    it('returns existing user by googleId', async () => {
      mockUsersService.findByGoogleId.mockResolvedValue(mockUser);

      const result = await service.findOrCreateGoogleUser('google-id', 'test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockUsersService.create).not.toHaveBeenCalled();
    });

    it('links google to existing email user and calls save', async () => {
      const saveFn = vi.fn();
      const userWithoutGoogle = {...mockUser, googleId: undefined, save: saveFn};
      mockUsersService.findByGoogleId.mockResolvedValue(null);
      mockUsersService.findByEmail.mockResolvedValue(userWithoutGoogle);

      const result = await service.findOrCreateGoogleUser('google-id', 'test@example.com');

      expect(result).toEqual(userWithoutGoogle);
      expect(saveFn).toHaveBeenCalledOnce();
    });

    it('creates new user when no match found', async () => {
      mockUsersService.findByGoogleId.mockResolvedValue(null);
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(mockUser);

      const result = await service.findOrCreateGoogleUser('google-id', 'new@example.com');

      expect(result).toEqual(mockUser);
      expect(mockUsersService.create).toHaveBeenCalledWith({
        email: 'new@example.com',
        googleId: 'google-id',
      });
    });
  });

  describe('getProfile', () => {
    it('returns user profile', () => {
      const result = service.getProfile(mockUser as never);

      expect(result).toEqual({
        email: 'test@example.com',
        id: 'user-id',
        username: 'testuser',
      });
    });
  });
});
