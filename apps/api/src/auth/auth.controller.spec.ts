import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
    signUp: jest.fn(),
  };

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.setHeader = jest.fn().mockReturnThis();
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res as Response;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in successfully', async () => {
    const dto: SignInDto = { email: 'test@test.com', password: 'pass' };
    const token = 'test-token';
    mockAuthService.signIn.mockResolvedValue(token);

    const res = mockResponse();
    await controller.signIn(dto, res);

    expect(res.setHeader).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Signed in successfully' });
  });

  it('should return 401 for invalid credentials', async () => {
    const dto: SignInDto = { email: 'test@test.com', password: 'wrong' };
    mockAuthService.signIn.mockRejectedValue(new Error('Invalid credentials'));

    const res = mockResponse();
    await controller.signIn(dto, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should sign out successfully', () => {
    const res = mockResponse();
    controller.signOut(res);
    expect(res.setHeader).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: 'Signed out successfully' });
  });

  it('should sign up successfully', async () => {
    const dto: SignupDto = { email: 'test@test.com', password: 'pass', firstName: 'Test', lastName: 'User' };
    mockAuthService.signUp.mockResolvedValue('User created');

    const res = mockResponse();
    await controller.signup(dto, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User created' });
  });

  it('should handle signup error', async () => {
    const dto: SignupDto = { email: 'test@test.com', password: 'pass', firstName: 'Test', lastName: 'User' };
    mockAuthService.signUp.mockRejectedValue(new Error('Signup failed'));

    const res = mockResponse();
    await controller.signup(dto, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Signup failed' });
  });
});