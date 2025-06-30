@path: '/service/llm'
service LLMService {
  action analyzeFreetext(input: String) returns String;
}
