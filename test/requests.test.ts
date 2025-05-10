// requests.test.ts
import { createRequest } from '../src/requests';
import { BASE_URL, DEFAULT_HEADERS } from '../src/constants';

// Mocking fetch
global.fetch = jest.fn();

describe('createRequest', () => {
  const apiKey = 'test-api-key';
  const path = '/test-path';
  const mockResponse = { data: 'test-data' };
  const mockJsonPromise = Promise.resolve(mockResponse);
  const mockFetchPromise = Promise.resolve({
    ok: true,
    json: () => mockJsonPromise,
  });

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    (fetch as jest.Mock).mockReturnValue(mockFetchPromise);
  });

  it('should call fetch with correct URL and headers', async () => {
    const request = createRequest(apiKey);
    const options = { method: 'GET' };

    await request(path, options);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${path}`, {
      ...options,
      headers: DEFAULT_HEADERS(apiKey),
    });
  });

  it('should merge custom headers with default headers', async () => {
    const request = createRequest(apiKey);
    const customHeaders = { 'Custom-Header': 'custom-value' };
    const options = { 
      method: 'GET',
      headers: customHeaders
    };

    await request(path, options);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${path}`, {
      ...options,
      headers: { ...DEFAULT_HEADERS(apiKey), ...customHeaders },
    });
  });

  it('should return JSON data when response is ok', async () => {
    const request = createRequest(apiKey);
    const result = await request(path, { method: 'GET' });

    expect(result).toEqual(mockResponse);
  });

  it('should return error object when response is not ok', async () => {
    const errorMessage = 'Error message';
    const errorResponse = { message: errorMessage };
    const errorJsonPromise = Promise.resolve(errorResponse);
    const errorFetchPromise = Promise.resolve({
      ok: false,
      json: () => errorJsonPromise,
    });

    (fetch as jest.Mock).mockReturnValue(errorFetchPromise);

    const request = createRequest(apiKey);
    const result = await request(path, { method: 'GET' });

    expect(result).toEqual({ error: errorMessage });
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Network error';
    (fetch as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const request = createRequest(apiKey);
    const result = await request(path, { method: 'GET' });

    expect(result).toEqual({ error: errorMessage });
  });
});
