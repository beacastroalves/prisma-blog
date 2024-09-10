import { Component } from "@angular/core";
import { Post } from "../../models/post.model";

@Component({
  selector: 'posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage {
  posts: Post[] = [
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '01',
      title: 'Title 01',
      description: 'Description 01',
      user: { username: 'beacastro' }
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '02',
      title: 'Title 02',
      description: 'Description 02',
      user: { username: 'beacastro' }
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '03',
      title: 'Title 03',
      description: 'Description 03',
      user: { username: 'beacastro' }
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '04',
      title: 'Title 04',
      description: 'Description 04',
      user: { username: 'beacastro' }
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '05',
      title: 'Title 05',
      description: 'Description 05',
      user: { username: 'beacastro' }
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '06',
      title: 'Title 06',
      description: 'Description 06',
      user: { username: 'beacastro' }
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '07',
      title: 'Title 07',
      description: 'Description 07',
      user: { username: 'beacastro' }
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '08',
      title: 'Title 08',
      description: 'Description 08',
      user: { username: 'beacastro' }
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '09',
      title: 'Title 09',
      description: 'Description 09',
      user: { username: 'beacastro' }
    }
  ];
}