import { container } from "tsyringe";
import BcryptProvider from "./implementations/BcryptProvider";
import { IBcryptProvider } from "./models/IBcryptProvider";

container.registerSingleton<IBcryptProvider>(
    'bcryptProvider',
    BcryptProvider,
);