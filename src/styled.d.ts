import 'styled-components';

declare module 'styled-components' {
  // styled.d.ts 파일을 생성 후 테마의 타입을 지정.
  // 추후 필요시 타입을 추가 생성.
  // 타입이 지정되었으므로, 작업시 자동완성도 가능.
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardColor: string;
  }
}
