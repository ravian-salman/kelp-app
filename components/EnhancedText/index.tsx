import React, { useMemo } from 'react';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { PoppinsBold, PoppinsMedium, PoppinsRegular } from '../StyledText';
import { TextProps, Text } from '../Themed';

export enum FontType {
  REGULAR = 'regular',
  BOLD = 'bold',
  MEDIUM = 'medium',
}

export default function EnhancedText({
  children,
  type = FontType.BOLD,
  ...rest
}: TextProps & { children: string; type?: FontType }): JSX.Element {
  const colorScheme = useColorScheme();

  const FontComponent = useMemo(() => {
    switch (type) {
      case FontType.BOLD:
        return PoppinsBold;
      case FontType.REGULAR:
        return PoppinsRegular;
      case FontType.MEDIUM:
        return PoppinsMedium;
    }
  }, [type]);

  const highlightTextRender = useMemo(() => {
    const regExp = /(\[[\w\s\d\W]+\]<[\w\d-]+>+)/g;

    const highLightArray: {
      index: number;
      text: string;
      colorVariable: string;
      sanitizedText: string;
    }[] = [];

    let match = null;
    while ((match = regExp.exec(children)) != null) {
      const matchedString = match[0];
      const sanitizedText = matchedString.slice(1, matchedString.indexOf(']'));
      const colorVariable = matchedString.slice(
        matchedString.indexOf(']') + 2,
        matchedString.indexOf('>')
      );

      highLightArray.push({
        index: match.index,
        text: match[0],
        colorVariable,
        sanitizedText,
      });
    }

    if (highLightArray.length !== 0) {
      const enhancedStringArray: {
        color?: string;
        text: string;
      }[] = [];

      let highLightIndex = 0;
      let startIndex = 0;
      let endIndex = highLightArray[highLightIndex].index;

      while (startIndex < children.length) {
        enhancedStringArray.push({
          text: (children as string).slice(startIndex, endIndex),
        });

        if (highLightIndex < highLightArray.length) {
          enhancedStringArray.push({
            text: highLightArray[highLightIndex].sanitizedText,
            color: Colors[colorScheme][highLightArray[highLightIndex].colorVariable] ?? '#000',
          });
        }

        startIndex =
          highLightIndex < highLightArray.length
            ? endIndex + highLightArray[highLightIndex].text.length
            : children.length;
        highLightIndex++;
        endIndex =
          highLightIndex < highLightArray.length
            ? highLightArray[highLightIndex].index
            : children.length;
      }

      return enhancedStringArray.map((enhancedString, idx) => {
        return (
          <Text key={idx} lightColor={enhancedString.color}>
            {enhancedString.text}
          </Text>
        );
      });
    }

    return children;
  }, [children]);

  return <FontComponent {...rest}>{highlightTextRender}</FontComponent>;
}
