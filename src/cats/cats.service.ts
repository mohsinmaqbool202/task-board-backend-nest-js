import { Injectable, NotFoundException  } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
    private cats: Cat[] = [];
    private id = 1;

    findAll(): Cat[] {
        return this.cats;
    }

    findOne(id: number): Cat {
        const cat = this.cats.find(c => c.id === id);
        if (!cat) 
            throw new NotFoundException('Cat not found');

        return cat;
    }

    create(createCatDto: CreateCatDto): Cat {
        const newCat: Cat = {
            id: this.id++,
            ...createCatDto
        };

        this.cats.push(newCat);
        return newCat;
    }

    update(id: number, updateCatDto: UpdateCatDto): Cat {
        const cat = this.findOne(id);
        const updated = { ...cat, ...updateCatDto };

        const index = this.cats.findIndex(c => c.id === id);
        this.cats[index] = updated;
        return updated;
    }

    delete(id: number): void {
        const index = this.cats.findIndex(c => c.id === id);
        if(index === -1) 
            throw new NotFoundException('Cat not found');

        this.cats.splice(index, 1);
    }
}
