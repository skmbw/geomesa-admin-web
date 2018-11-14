/**
 * 数据库连接Bean
 */
export class Connection {
  port = 2181;
  quorum: string;
  master: string;
  catalog: string;
  remember: boolean;
}
