module.exports = {
  printWidth: 85,
  tabWidth: 2,
  trailingComma: 'none',
  singleQuote: true,
  semi: true,
  importOrder: [
    '(^@nestjs/.*?$)|(\\w*\\.decorator|express|mongoose\\w*)',
    '<THIRD_PARTY_MODULES>',
    '\\w*\\.module|\\.controller|\\.service\\w*',
    '\\w*\\.schema\\w*',
    '\\w*\\.helper|\\.filter|\\.guard\\w*',
    '\\w*\\.dto\\w*',
    '\\w*\\.constants\\w*'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy']
};
