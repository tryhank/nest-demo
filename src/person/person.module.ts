import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

function asyncFn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'abc',
        age: 12,
      });
    }, 3000);
  });
}

@Module({
  controllers: [PersonController],
  providers: [
    PersonService,
    {
      provide: 'person2',
      useValue: 'aaabb',
    },
    {
      provide: 'person3',
      useFactory(name: string) {
        console.log(name, 'name');
        return '123';
      },
      inject: ['person2'],
    },
    // {
    //   provide: 'person4',
    //   async useFactory(name: string) {
    //     return await asyncFn();
    //   },
    // },
  ],
})
export class PersonModule {}
